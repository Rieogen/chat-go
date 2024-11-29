package handlers

import (
	"backend/database"
	"backend/models"
	"encoding/json"
	"fmt"
	"net/http"
	"os"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

func GetChannels(c *gin.Context, db *gorm.DB) {
	fmt.Println("GetChannels")
	var channels []models.Channel
	result := db.Find(&channels)
	if database.ErrorDB(result, c) {
		return
	}
	fmt.Println(json.NewEncoder(os.Stdout).Encode(channels))
	c.JSON(http.StatusOK, channels)

}

func CreateChannel(c *gin.Context, db *gorm.DB) {
	fmt.Println("CreateChannel")
	var channel models.Channel
	if err := c.ShouldBindBodyWithJSON(&channel); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	result := db.Create(&channel)
	if database.ErrorDB(result, c) {
		return
	}
}
