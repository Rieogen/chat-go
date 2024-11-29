package main

import (
	"backend/router"
	"log"
)

func main() {
	// ルーターを取得
	r := router.SetupRouter()

	// サーバーを起動
	if err := r.Run(":3000"); err != nil {
		log.Fatalf("Failed to start server: %s", err)
	}
}
