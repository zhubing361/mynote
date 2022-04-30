package apis

import (
	"golang/packages"

	"github.com/gin-gonic/gin"
)

type Api struct {
	Version string `json:"version"`
}

func Index(c *gin.Context) {
	app := packages.Gin{C: c}
	app.Success("succss", Api{
		Version: "1.0.0",
	})
}
