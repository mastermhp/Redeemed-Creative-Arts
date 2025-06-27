// Client-side API utility functions
export class ApiClient {
  static async request(endpoint, options = {}) {
    const url = endpoint.startsWith("/") ? endpoint : `/${endpoint}`

    const config = {
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
      ...options,
    }

    if (config.body && typeof config.body === "object") {
      config.body = JSON.stringify(config.body)
    }

    try {
      const response = await fetch(url, config)
      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || `HTTP error! status: ${response.status}`)
      }

      return data
    } catch (error) {
      console.error("API request failed:", error)
      throw error
    }
  }

  static async get(endpoint, params = {}) {
    const url = new URL(endpoint, window.location.origin)
    Object.keys(params).forEach((key) => {
      if (params[key] !== undefined && params[key] !== null) {
        url.searchParams.append(key, params[key])
      }
    })

    return this.request(url.pathname + url.search, { method: "GET" })
  }

  static async post(endpoint, data = {}) {
    return this.request(endpoint, {
      method: "POST",
      body: data,
    })
  }

  static async put(endpoint, data = {}) {
    return this.request(endpoint, {
      method: "PUT",
      body: data,
    })
  }

  static async patch(endpoint, data = {}) {
    return this.request(endpoint, {
      method: "PATCH",
      body: data,
    })
  }

  static async delete(endpoint) {
    return this.request(endpoint, { method: "DELETE" })
  }
}

// Dashboard API functions
export const dashboardApi = {
  // Artist Dashboard APIs
  getArtistStats: (userId) => ApiClient.get(`/api/dashboard/artist/stats?userId=${userId}`),
  getArtistArtworks: (userId, params = {}) => ApiClient.get(`/api/dashboard/artist/artworks?userId=${userId}`, params),
  getArtistContests: (userId) => ApiClient.get(`/api/dashboard/artist/contests?userId=${userId}`),
  getHelperBookings: (userId) => ApiClient.get(`/api/dashboard/artist/helper-bookings?userId=${userId}`),

  // Patron Dashboard APIs
  getPatronStats: (userId) => ApiClient.get(`/api/dashboard/patron/stats?userId=${userId}`),
  getPatronDonations: (userId, params = {}) =>
    ApiClient.get(`/api/dashboard/patron/donations?userId=${userId}`, params),
  getSupportedArtists: (userId) => ApiClient.get(`/api/dashboard/patron/supported-artists?userId=${userId}`),
  getActiveCampaigns: (params = {}) => ApiClient.get("/api/dashboard/patron/campaigns", params),

  // Church Dashboard APIs
  getChurchStats: (userId) => ApiClient.get(`/api/dashboard/church/stats?userId=${userId}`),
  getChurchEvents: (userId, params = {}) => ApiClient.get(`/api/dashboard/church/events?userId=${userId}`, params),
  getAvailableHelpers: (params = {}) => ApiClient.get("/api/dashboard/church/helpers", params),
  getChurchCampaigns: (userId) => ApiClient.get(`/api/dashboard/church/campaigns?userId=${userId}`),

  // Admin Dashboard APIs
  getAdminStats: () => ApiClient.get("/api/admin/dashboard"),
  getPendingApprovals: (params = {}) => ApiClient.get("/api/admin/artworks", params),
  getAllUsers: (params = {}) => ApiClient.get("/api/admin/users", params),
  getDonationStats: (params = {}) => ApiClient.get("/api/admin/donations", params),
}

// Artwork APIs
export const artworkApi = {
  uploadArtwork: (data) => ApiClient.post("/api/artworks", data),
  getArtworks: (params = {}) => ApiClient.get("/api/artworks", params),
  getArtwork: (id) => ApiClient.get(`/api/artworks/${id}`),
  updateArtwork: (id, data) => ApiClient.put(`/api/artworks/${id}`, data),
  deleteArtwork: (id) => ApiClient.delete(`/api/artworks/${id}`),
  likeArtwork: (id) => ApiClient.post(`/api/artworks/${id}/like`),
}

// User APIs
export const userApi = {
  updateProfile: (data) => ApiClient.put("/api/user/profile", data),
  getProfile: () => ApiClient.get("/api/user/profile"),
  updatePreferences: (data) => ApiClient.put("/api/user/preferences", data),
}

// Contest APIs
export const contestApi = {
  getContests: (params = {}) => ApiClient.get("/api/contests", params),
  submitToContest: (data) => ApiClient.post("/api/contests", data),
  voteOnContest: (contestId, data) => ApiClient.post(`/api/contests/${contestId}/vote`, data),
}

// Donation APIs
export const donationApi = {
  makeDonation: (data) => ApiClient.post("/api/donations", data),
  getDonations: (params = {}) => ApiClient.get("/api/donations", params),
}

// Helper APIs
export const helperApi = {
  getHelpers: (params = {}) => ApiClient.get("/api/helpers", params),
  bookHelper: (data) => ApiClient.post("/api/helpers/book", data),
  updateHelperProfile: (data) => ApiClient.put("/api/helpers/profile", data),
}
