package models

import (
	"context"
	"math"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo/options"
)

type Note struct {
	Model
	NoteId    int64   `json:"note_id" bson:"note_id"`
	Title     string  `json:"title" bson:"title"`
	Content   string  `json:"content" bson:"content"`
	CreatedAt float64 `json:"created_at" bson:"created_at"`
	UpdatedAt float64 `json:"updated_at" bson:"updated_at"`
}

type NoteQuery struct {
	Keyword string `json:"keyword"`
}

type NoteListPage struct {
	Items      []*Note     `json:"items"`
	Pagination *Pagination `json:"pagination"`
}

func (note *Note) GetNoteList(query *NoteQuery, page_size int64, page int64) (data interface{}, err error) {

	condition := bson.D{}
	if query.Keyword != "" {
		condition = append(condition, bson.E{Key: "title", Value: bson.M{"$regex": primitive.Regex{Pattern: ".*" + query.Keyword + ".*", Options: "i"}}})
	}

	count, err := Collection.CountDocuments(context.TODO(), condition)
	if err != nil {
		return nil, err
	}

	findOptions := options.Find()
	findOptions.SetLimit(page_size)
	findOptions.SetSkip((page - 1) * page_size)
	findOptions.SetSort(bson.M{"created_at": -1})

	cur, err := Collection.Find(context.TODO(), condition, findOptions)
	if err != nil {
		return nil, err
	}

	var notes []*Note
	err = cur.All(context.TODO(), &notes)
	if err != nil {
		return nil, err
	}
	defer func() {
		cur.Close(context.TODO())
	}()

	pagination := Pagination{
		Total:       count,
		CurrentPage: page,
		PerPage:     page_size,
		TotalPage:   int64(math.Ceil(float64((page - 1) * page_size))),
	}

	return NoteListPage{
		Items:      notes,
		Pagination: &pagination,
	}, nil
}

func (note *Note) GetNoteDetail(note_id int64) (err error) {
	err = Collection.FindOne(context.TODO(), bson.M{"note_id": note_id}).Decode(&note)
	if err != nil {
		return err
	}
	return err
}

func (note *Note) CreateNote() (err error) {
	_, err = Collection.InsertOne(context.TODO(), note, options.InsertOne())
	if err != nil {
		return err
	}
	return err
}

func (note *Note) UpdateNote(note_id int64) (err error) {
	_, err = Collection.UpdateOne(context.TODO(), bson.M{"note_id": note_id}, bson.M{"$set": note})
	if err != nil {
		return err
	}
	return err
}

func (note *Note) DeleteNote(note_id int64) (err error) {
	_, err = Collection.DeleteOne(context.TODO(), bson.M{"note_id": note_id})
	if err != nil {
		return err
	}
	return err
}
