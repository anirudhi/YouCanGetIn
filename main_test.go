package main

import (
	"net/http"
	"net/http/httptest"
	"testing"
)

func TestHandler(t *testing.T) {
	// Form new http request
	req, err := http.NewRequest("GET", "", nil)

	// Check for error in forming the request
	if err != nil {
		t.Fatal(err)
	}

	// Create recorder
	recorder := httptest.NewRecorder()

	// Create a http handler from a handler function
	hf := http.HandlerFunc(getMain)

	// Serve the http request to the recorder
	hf.ServeHTTP(recorder, req)

	// Check to see if the status code is OK
	if status := recorder.Code; status != http.StatusOK {
		t.Errorf("handler returned wrong status code: got %v, want %v",
			status, http.StatusOK)
	}

	// Check the response body is correct
	expected := `Hello World!`
	actual := recorder.Body.String()
	if actual != expected {
		t.Errorf("handler returned unexpected body: got %v want %v", actual, expected)
	}
}
