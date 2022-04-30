package packages

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

type Gin struct {
	C *gin.Context
}

type Response struct {
	Code    int         `json:"code"`
	Message string      `json:"message"`
	Result  string      `json:"result"`
	Data    interface{} `json:"data"`
}

func (g *Gin) Success(result string, data interface{}) {
	g.C.JSON(http.StatusOK, Response{
		Code:    1,
		Message: "success",
		Result:  result,
		Data:    data,
	})
}

func (g *Gin) Fail(result string, data interface{}) {
	g.C.JSON(http.StatusOK, Response{
		Code:    0,
		Message: "fail",
		Result:  result,
		Data:    data,
	})
}
