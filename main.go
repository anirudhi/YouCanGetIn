package main

import (
	"log"
	"net/http"

	"github.com/Tardishade/YouCanGetIn/university"
	"github.com/gorilla/handlers"
)

func main() {
	// Init router
	router := university.NewRouter()

	// Allow access from front-end
	allowedHeaders := handlers.AllowedHeaders([]string{"X-Requested-With"})
	allowedOrigins := handlers.AllowedOrigins([]string{"*"})
	allowedMethods := handlers.AllowedMethods([]string{"GET", "HEAD", "POST", "PUT", "DELETE", "OPTIONS"})

	// Start server
	log.Fatal(http.ListenAndServe(":9000", handlers.CORS(allowedHeaders, allowedOrigins, allowedMethods)(router)))
}
