package main

import (
	"fmt"
	"log"
	"net/http"

	"github.com/gorilla/mux"
)

func getRoutes() *mux.Router {
	// Init router
	r := mux.NewRouter()

	// Handle routes
	r.HandleFunc("/", getMain).Methods("GET")
	r.HandleFunc("/universities", getUniversities).Methods("GET")
	r.HandleFunc("/universities/{id}", getUniversity).Methods("GET")
	r.HandleFunc("/universities/{id}", createUniversity).Methods("POST")
	r.HandleFunc("/universities/{id}", deleteUniversity).Methods("DELETE")
	r.HandleFunc("/universities/{id}", changeUniversity).Methods("PUT")

	return r
}

func main() {
	// Init router
	r := getRoutes()

	// Start server
	log.Fatal(http.ListenAndServe(":8000", r))
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
