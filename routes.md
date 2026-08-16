# API Route Map

This document lists each parent route mounted in `src/app.js` and its child routes defined in the corresponding router files.

## Parent: `/api/auth`
Router file: `src/routes/auth.routes.js`

| Method | Child Route | Full Route |
|---|---|---|
| POST | `/logout` | `/api/auth/logout` |
| POST | `/register` | `/api/auth/register` |
| POST | `/login` | `/api/auth/login` |
| POST | `/refresh` | `/api/auth/refresh` |

## Parent: `/api/users`
Router file: `src/routes/user.routes.js`

| Method | Child Route | Full Route |
|---|---|---|
| GET | `/me` | `/api/users/me` |
| PATCH | `/update` | `/api/users/update` |

## Parent: `/api/workspaces`
Router file: `src/routes/workspace.routes.js`

| Method | Child Route | Full Route |
|---|---|---|
| POST | `/` | `/api/workspaces/` |
| GET | `/` | `/api/workspaces/` |
| GET | `/:id` | `/api/workspaces/:id` |
| PATCH | `/:id` | `/api/workspaces/:id` |
| DELETE | `/:id` | `/api/workspaces/:id` |

## Parent: `/api/workspaces/:workspaceId/invite`
Router file: `src/routes/workspaceinvite.routes.js`

| Method | Child Route | Full Route |
|---|---|---|
| POST | `/` | `/api/workspaces/:workspaceId/invite/` |
| GET | `/sent` | `/api/workspaces/:workspaceId/invite/sent` |
| DELETE | `/:inviteId` | `/api/workspaces/:workspaceId/invite/:inviteId` |

## Parent: `/api/invitations`
Router file: `src/routes/invitation.routes.js`

| Method | Child Route | Full Route |
|---|---|---|
| PATCH | `/:inviteId` | `/api/invitations/:inviteId` |
| GET | `/invites` | `/api/invitations/invites` |

## Parent: `/api/workspaces/:workspaceId/members`
Router file: `src/routes/workspacemember.routes.js`

| Method | Child Route | Full Route |
|---|---|---|
| GET | `/` | `/api/workspaces/:workspaceId/members/` |
| DELETE | `/:memberId` | `/api/workspaces/:workspaceId/members/:memberId` |
| DELETE | `/exit` | `/api/workspaces/:workspaceId/members/exit` |
| PATCH | `/update-role` | `/api/workspaces/:workspaceId/members/update-role` |

## Parent: `/api/workspaces/:workspaceId/projects`
Router file: `src/routes/project.routes.js`

| Method | Child Route | Full Route |
|---|---|---|
| POST | `/` | `/api/workspaces/:workspaceId/projects/` |
| GET | `/` | `/api/workspaces/:workspaceId/projects/` |
| GET | `/:projectId` | `/api/workspaces/:workspaceId/projects/:projectId` |
| PUT | `/:projectId` | `/api/workspaces/:workspaceId/projects/:projectId` |
| DELETE | `/:projectId` | `/api/workspaces/:workspaceId/projects/:projectId` |

## Parent: `/api/workspaces/:workspaceId/projects/:projectId/members`
Router file: `src/routes/projectmember.routes.js`

| Method | Child Route | Full Route |
|---|---|---|
| POST | `/` | `/api/workspaces/:workspaceId/projects/:projectId/members/` |
| GET | `/` | `/api/workspaces/:workspaceId/projects/:projectId/members/` |
| GET | `/:memberId` | `/api/workspaces/:workspaceId/projects/:projectId/members/:memberId` |
| DELETE | `/:memberId` | `/api/workspaces/:workspaceId/projects/:projectId/members/:memberId` |
| DELETE | `/exit` | `/api/workspaces/:workspaceId/projects/:projectId/members/exit` |
| PATCH | `/update-role` | `/api/workspaces/:workspaceId/projects/:projectId/members/update-role` |

## Parent: `/api/workspaces/:workspaceId/projects/:projectId/boards`
Router file: `src/routes/board.routes.js`

| Method | Child Route | Full Route |
|---|---|---|
| POST | `/` | `/api/workspaces/:workspaceId/projects/:projectId/boards/` |
| GET | `/` | `/api/workspaces/:workspaceId/projects/:projectId/boards/` |
| GET | `/:boardId` | `/api/workspaces/:workspaceId/projects/:projectId/boards/:boardId` |
| PUT | `/:boardId` | `/api/workspaces/:workspaceId/projects/:projectId/boards/:boardId` |
| DELETE | `/:boardId` | `/api/workspaces/:workspaceId/projects/:projectId/boards/:boardId` |

## Parent: `/api/workspaces/:workspaceId/projects/:projectId/boards/:boardId/columns`
Router file: `src/routes/boardcolumn.routes.js`

| Method | Child Route | Full Route |
|---|---|---|
| POST | `/` | `/api/workspaces/:workspaceId/projects/:projectId/boards/:boardId/columns/` |
| GET | `/` | `/api/workspaces/:workspaceId/projects/:projectId/boards/:boardId/columns/` |
| PATCH | `/reorder` | `/api/workspaces/:workspaceId/projects/:projectId/boards/:boardId/columns/reorder` |
| PUT | `/:columnId` | `/api/workspaces/:workspaceId/projects/:projectId/boards/:boardId/columns/:columnId` |
| DELETE | `/:columnId` | `/api/workspaces/:workspaceId/projects/:projectId/boards/:boardId/columns/:columnId` |

## Standalone Route
Defined directly in `src/app.js`:

| Method | Route |
|---|---|
| GET | `/health` |
