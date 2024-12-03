package handlers

import (
	"backend/database"
	"backend/models"
	"encoding/json"
	"fmt"
	"net/http"
	"os"
	"strconv"

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
	// チャンネル名のバリデーション
	if channel.Title == "" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "name is required"})
		return
	}
	result := db.Create(&channel)
	if database.ErrorDB(result, c) {
		return
	}

	c.JSON(http.StatusCreated, channel)
}

func GetChannelByID(c *gin.Context, db *gorm.DB) {
	fmt.Println("GetChannelByID")
	id := c.Param("id")

	// IDをuintに変換
	channelID, err := strconv.ParseUint(id, 10, 32)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "invalid id"})
		return
	}

	var channel models.Channel
	// チャンネルとその関連するメッセージを取得
	result := db.Preload("Messages").First(&channel, uint(channelID))
	if result.Error != nil {
		if result.Error == gorm.ErrRecordNotFound {
			c.JSON(http.StatusNotFound, gin.H{"error": "channel not found"})
			return
		}
		// その他のデータベースエラーの場合
		c.JSON(http.StatusInternalServerError, gin.H{"error": result.Error.Error()})
		return
	}

	c.JSON(http.StatusOK, channel)
}

func PostMessage(c *gin.Context, db *gorm.DB) {
	fmt.Println("PostMessage")
	id := c.Param("id")
	if id == "" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "id is required"})
		return
	}
	
	channelID, err := strconv.ParseUint(id, 10, 32)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "invalid id"})
		return
	}

	// チャンネルの存在確認
	var channel models.Channel
	if err := db.First(&channel, uint(channelID)).Error; err != nil {
		if err == gorm.ErrRecordNotFound {
			c.JSON(http.StatusNotFound, gin.H{"error": "channel not found"})
			return
		}
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	var message models.Message
	if err := c.ShouldBindBodyWithJSON(&message); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// usernameとmessageのバリデーション
	if message.UserName == "" || message.Message == "" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "username and message are required"})
		return
	}

	message.ChannelID = uint(channelID)
	result := db.Create(&message)
	if database.ErrorDB(result, c) {
		return
	}

	c.JSON(http.StatusCreated, message)
}
