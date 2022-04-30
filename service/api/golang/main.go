package main

import (
	"golang/routers"
)

func main() {
	api := routers.InitRouter()
	api.Run(":5004")
}
