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
	allowedOrigins := handlers.AllowedOrigins([]string{"*"})
	allowedMethods := handlers.AllowedMethods([]string{"GET", "POST", "DELETE", "PUT"})

	// Start server
	log.Fatal(http.ListenAndServe(":9000", handlers.CORS(allowedOrigins, allowedMethods)(router)))
}
