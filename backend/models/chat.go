package models

import (
	"gorm.io/gorm"
)

type Channel struct {
	*gorm.Model
	Title string `json:"title"`
	Messages []Message `json:"messages" gorm:"foreignKey:ChannelID"`
}

type Message struct {
	*gorm.Model
	ChannelID uint   `json:"channel_id"`
	UserName	string `json:"user_name"`
	Message  string `json:"message"`
}
