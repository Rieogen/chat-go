package models

import (
	"gorm.io/gorm"
)

type Channel struct {
	*gorm.Model
	Title string `json:"title"`
}
