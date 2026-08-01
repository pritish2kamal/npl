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

This first version stores scoring and schedule edits in browser local storage.
For live multi-device usage, connect the same UI to a real-time backend such as
Firebase, Supabase, or a Node API with WebSockets.

The logo asset is stored at `src/assets/npl-logo.jpeg`.

## Admin Access

Public viewers do not need to login. Update controls are hidden unless the
browser has an Admin session. Admins can update scores, mark winners, change
line-ups, mark trump games, and reschedule matches.

Allowed Admin user IDs are configured in:

```text
src/config/admin-users.js
```

The current prototype checks that config in the browser and stores score/schedule
edits in browser local storage. For live multi-device usage, move the same Admin
allowlist and match-state updates to a backend such as Supabase, Firebase, or a
Node API with WebSockets.
