package routers

import (
	"golang/apis"
	"net/http"

	"github.com/gin-gonic/gin"
)

func CorsMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		w := c.Writer
		w.Header().Set("Access-Control-Allow-Origin", "*")
		w.Header().Set("Access-Control-Allow-Methods", "OPTIONS, POST, GET, PUT, DELETE")
		w.Header().Add("Access-Control-Allow-Headers", "*")
		w.Header().Add("Access-Control-Allow-Credentials", "true")
		if c.Request.Method == "OPTIONS" {
			c.AbortWithStatus(http.StatusNoContent)
		}
		c.Next()
	}
}

func InitRouter() *gin.Engine {
	router := gin.New()

	// gin.SetMode(gin.ReleaseMode)

	router.SetTrustedProxies([]string{"127.0.0.1"})
	router.Use(CorsMiddleware())

	router.GET("/", apis.Index)
	router.GET("/notes", apis.GetNoteList)
	router.GET("/notes/:note_id", apis.GetNoteDetail)
	router.POST("/notes", apis.CreateNote)
	router.PUT("/notes/:note_id", apis.UpdateNote)
	router.DELETE("/notes/:note_id", apis.DeleteNote)

	return router
}
