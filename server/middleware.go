package pkg

import "net/http"

// secureHeadersMiddleware adds two basic security headers to each HTTP response
// X-XSS-Protection: 1; mode-block can help to prevent XSS attacks
// X-Frame-Options: deny can help to prevent clickjacking attacks
func secureHeadersMiddleware(next http.Handler) http.Handler {
  return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
    w.Header().Set("X-XSS-Protection", "1; mode-block")
    w.Header().Set("X-Frame-Options", "deny")
    
    next.ServeHTTP(w, r)
  })
}