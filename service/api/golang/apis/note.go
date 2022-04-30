package apis

import (
	"golang/models"
	"golang/packages"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/unknwon/com"
)

type NoteForm struct {
	Title   string `json:"title"`
	Content string `json:"content"`
}

func init() {
	models.Connect("flask", "notes")
}

func GetNoteList(c *gin.Context) {
	app := packages.Gin{C: c}

	noteQuery := models.NoteQuery{}
	err := c.ShouldBind(&noteQuery)
	if err != nil {
		noteQuery.Keyword = c.Query("keyword")
	}
	page_size := com.StrTo(c.Query("page_size")).MustInt64()
	if page_size == 0 {
		page_size = 10
	}
	page := com.StrTo(c.Query("page")).MustInt64()
	if page == 0 {
		page = 1
	}
	note := models.Note{}
	data, err := note.GetNoteList(&noteQuery, page_size, page)
	if err != nil {
		app.Fail("fail", nil)
	} else {
		app.Success("success", data)
	}

}

func GetNoteDetail(c *gin.Context) {

	app := packages.Gin{C: c}

	note_id := com.StrTo(c.Param("note_id")).MustInt64()
	note := models.Note{}
	err := note.GetNoteDetail(note_id)
	if err != nil {
		app.Fail("fail", nil)
	} else {
		app.Success("success", note)
	}
}

func CreateNote(c *gin.Context) {

	app := packages.Gin{C: c}

	noteForm := NoteForm{}
	err := c.ShouldBind(&noteForm)
	if err != nil {
		app.Fail("fail", nil)
	}
	note := models.Note{
		NoteId:    generate_note_id(),
		Title:     noteForm.Title,
		Content:   noteForm.Content,
		CreatedAt: generate_timestamp(),
		UpdatedAt: generate_timestamp(),
	}
	err = note.CreateNote()
	if err != nil {
		app.Fail("fail", nil)
	} else {
		app.Success("success", nil)
	}
}

func UpdateNote(c *gin.Context) {
	app := packages.Gin{C: c}

	note_id := com.StrTo(c.Param("note_id")).MustInt64()
	note := models.Note{}
	err := note.GetNoteDetail(note_id)
	if err != nil {
		app.Fail("fail", nil)
	} else {
		noteForm := NoteForm{}
		err = c.ShouldBind(&noteForm)
		if err != nil {
			app.Fail("fail", nil)
		}
		note.Title = noteForm.Title
		note.Content = noteForm.Content
		note.UpdatedAt = generate_timestamp()
		err = note.UpdateNote(note_id)
		if err != nil {
			app.Fail("fail"+err.Error(), nil)
		} else {
			app.Success("success", nil)
		}
	}

}

func DeleteNote(c *gin.Context) {
	app := packages.Gin{C: c}

	note_id := com.StrTo(c.Param("note_id")).MustInt64()
	note := models.Note{
		NoteId: note_id,
	}
	err := note.DeleteNote(note_id)
	if err != nil {
		app.Fail("fail", nil)
	} else {
		app.Success("success", nil)
	}
}

func generate_note_id() int64 {
	return int64(time.Now().Local().UnixNano() / 1e9)
}

func generate_timestamp() float64 {
	return float64(time.Now().Local().UnixNano() / 1e9)
}
