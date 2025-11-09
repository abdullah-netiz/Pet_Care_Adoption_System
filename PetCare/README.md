# Pet Care & Adoption System Frontend

This frontend (React + Vite) provides authentication, a home dashboard, and a newly added user Profile page with role-specific views.

## Profile Page (/profile)
Features:
- Overview header with avatar, role badge (Adopter vs Owner), email + phone.
- Stats cards (total pets, saved/adopted for adopters; active listings for owners).
- Account details form (update email/phone locally). Password change form (mock only).
- Role-based sections:
	- Adopter: Saved Pets & Adopted Pets cards.
	- Owner: My Listings grid + Add Pet modal (frontend-only, stored in component state).
- Responsive design and accessible labels.

## Implementation Notes
- All updates are frontend-only; no persistence beyond in-memory state except token in localStorage.
- `AuthContext.jsx` extended with `updateProfile` and `updatePassword` placeholder methods.
- Profile route added in `App.jsx` with auth guard.
- Header avatar link added to `Home.jsx`.

## Future Backend Integration Points
Replace mocks with API calls:
- GET /api/users/me -> hydrate full profile (email, phone, role, pets saved/adopted/listings).
- PATCH /api/users/me -> update email/phone.
- POST /api/users/me/password -> change password.
- GET /api/pets?saved=true /api/pets?adopted=true /api/pets?ownerListings=true
- POST /api/pets (owner add listing), DELETE /api/pets/:id, PATCH /api/pets/:id.

Add optimistic UI: update local state first, rollback on error.
Add loading + skeleton states for each section.

## Dev Scripts
Run development server:
```
npm run dev
```
Build for production:
```
npm run build
```
Lint:
```
npm run lint
```

## Suggested Next Steps
1. Implement backend endpoints aligning with above integration points.
2. Add global pet context to share listings/saved/adopted across pages.
3. Add image uploads (drag & drop) for pet listings.
4. Add search/filter components for pets on Home.
5. Accessibility pass (keyboard trap checks in modal, ARIA roles refinement).

---
This README will expand as backend endpoints become available.

