package main

import (
	"YouCanGetIn/university"
	"fmt"
	"log"
	"net/http"
)

func main() {
	// Init router
	r := university.NewRouter()

	// Allow access from front-end
	allowedOrigins := handlers.AllowedOrigins([]string{"*"})
	allowedMethods := handlers.AllowedMethods([]string{"GET", "POST", "DELETE", "PUT"})

	// Start server
	log.Fatal(http.ListenAndServe(":9000", handlers.CORS(allowedOrigins, allowedMethods)(router)))
}

// Handlers
func getMain(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(w, "Hello World!")
}

func getUniversities(w http.ResponseWriter, r *http.Request) {

}

func getUniversity(w http.ResponseWriter, r *http.Request) {

}

func createUniversity(w http.ResponseWriter, r *http.Request) {

}

func deleteUniversity(w http.ResponseWriter, r *http.Request) {

}

func changeUniversity(w http.ResponseWriter, r *http.Request) {

}
