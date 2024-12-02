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
	r.POST("/api/channels", func(c *gin.Context) {
		handlers.CreateChannel(c, db)
	})
	r.GET("/api/channels/:id", func(c *gin.Context) {
		handlers.GetChannelByID(c, db)
	})
	r.POST("/api/channels/:id", func(c *gin.Context) {
		handlers.PostMessage(c, db)
	})

	return r
}
