package models

import (
	"gorm.io/gorm"
)

type Channel struct {
	*gorm.Model
	Name string `json:"name"`
	Messages []Message `json:"messages" gorm:"foreignKey:ChannelID"`
}

type Message struct {
	*gorm.Model
	ChannelID uint   `json:"channel_id"`
	UserName	string `json:"user_name"`
	Content  string `json:"content"`
}
