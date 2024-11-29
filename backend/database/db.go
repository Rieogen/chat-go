package database

import (
	"backend/models"
	"fmt"
	"log"
	"net/http"
	"time"

	"github.com/gin-gonic/gin"
	_ "github.com/go-sql-driver/mysql" // MySQLドライバ
	"gorm.io/driver/mysql"
	"gorm.io/gorm"
)

func ConnectDB() *gorm.DB {
	USER := "user"
	PASS := "password"
	HOST := "mysql" // MySQLコンテナ名
	PORT := "3306"
	DBNAME := "my_database"

	dsn := fmt.Sprintf("%s:%s@tcp(%s:%s)/%s?charset=utf8mb4&parseTime=True&loc=Local", USER, PASS, HOST, PORT, DBNAME)

	var db *gorm.DB
	var err error

	// リトライロジック（最大10回）
	for i := 0; i < 10; i++ {
		db, err = gorm.Open(mysql.Open(dsn), &gorm.Config{})
		if err == nil {
			// 接続成功
			log.Println("Connected to the database.")
			return db
		}

		// 接続失敗、次回リトライまで待機
		log.Printf("Failed to connect to database: %v. Retrying in 5 seconds...\n", err)
		time.Sleep(5 * time.Second)
	}

	// 10回リトライしても失敗した場合はプログラム停止
	log.Fatalf("Failed to connect to database after multiple attempts: %v", err)
	return nil
}

func InitDB() (*gorm.DB, error) {
	db := ConnectDB()

	db.AutoMigrate(&models.Channel{})
	return db, nil
}

func ErrorDB(db *gorm.DB, c *gin.Context) bool {
	if db.Error != nil {
		log.Printf("Error: %v", db.Error)
		c.AbortWithStatus(http.StatusInternalServerError)
		return true
	}
	return false
}
