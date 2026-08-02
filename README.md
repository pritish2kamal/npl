# NPL 2026 Tournament Portal

Responsive prototype for the in-house badminton tournament.

## Included

- Resident live view with YouTube feed and live scoreboard overlay.
- Day-wise and category-wise fixture schedule from the uploaded NPL PDF.
- Schedule line-up selection that infers Singles/Doubles and lets organisers
  choose actual players or pairs for each side.
- Separate Dashboard page with all-category and category-filtered standings.
  Team Championship uses trump scoring; other categories use win-based points.
- Public viewer mode is read-only; score and match updates require Admin
  login.
- Group-wise player and team roster pages.
- Results page with completed match list and simple standings.
- Mobile Admin console for score updates, match status, and rescheduling.
- Cropped Nature Walk Premier League Badminton logo from the supplied photo,
  animated live score changes, and rule cards based on the attached rules and
  regulations document.

## Run Locally

```bash
cd /workspace/scratch/7f2886a9fe0a/npl
npm run dev
```

Open:

```text
http://localhost:5173
```

## Notes For Production

When deployed on Firebase Hosting, the portal syncs the shared live tournament
state through Cloud Firestore. Local browser storage remains as a fallback for
offline/local preview.

The logo asset is stored at `src/assets/npl-logo.jpeg`.

## Admin Access

Public viewers do not need to login. Update controls are hidden unless the
browser has an Admin session. Admins can update scores, mark winners, change
line-ups, mark trump games, and reschedule matches.

Allowed Admin usernames and passwords are configured in:

```text
src/config/admin-users.js
```

Default demo credentials:

```text
Username: admin
Password: npl2026
```

The current prototype checks Admin credentials in the browser and writes the
Admin user ID with Firestore updates. For stronger production security, replace
this with Firebase Authentication and Firestore rules based on authenticated
Admin email addresses or custom claims.

## Firebase Deploy

The hosted app reads Firebase config from Firebase Hosting and writes shared
state to `portalState/live` in Cloud Firestore.

Deploy from the Firebase project folder:

```powershell
firebase deploy
```

If your Firebase project folder is one level above this app, set the hosting
public directory to `npl` in `firebase.json`, then run:

```powershell
firebase deploy --only hosting,firestore
```
