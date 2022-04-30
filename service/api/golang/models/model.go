package models

import (
	"context"
	"log"
	"time"

	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

type Model struct {
	CreatedAt float64 `json:"created_at" bson:"created_at"`
	UpdatedAt float64 `json:"updated_at" bson:"updated_at"`
}

type Pagination struct {
	Total       int64 `json:"total"`
	CurrentPage int64 `json:"currentPage"`
	PerPage     int64 `json:"perPage"`
	TotalPage   int64 `json:"totalPage"`
}

var Collection *mongo.Collection

func Connect(index string, doc_type string) {
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()
	client, err := mongo.Connect(ctx, options.Client().ApplyURI("mongodb://127.0.0.1:30001"))
	if err != nil {
		log.Fatalf("database connect err: %v", err)
	}
	print("database connect success.")

	Collection = client.Database(index).Collection(doc_type)
}

// https://pkg.go.dev/go.mongodb.org/mongo-driver@v1.4.0#section-readme
