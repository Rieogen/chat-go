package router

import (
	"backend/database"
	"backend/handlers"

	"github.com/gin-gonic/gin"
)

func SetupRouter() *gin.Engine {
	r := gin.Default()
	db, _ := database.InitDB()

	r.GET("/api/channels", func(c *gin.Context) {
		handlers.GetChannels(c, db)
	})
	// r.GET("/api/channels/:id", handlers.GetChannelByID)
	r.POST("/api/channels", func(c *gin.Context) {
		handlers.CreateChannel(c, db)
	})

	return r
}
