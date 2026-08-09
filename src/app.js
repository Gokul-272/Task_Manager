const express = require('express');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const authRoutes = require('./routes/auth.routes');
const userRoutes = require('./routes/user.routes');
const workspaceRoutes = require('./routes/workspace.routes');
const workspaceInviteRoutes = require('./routes/workspaceinvite.routes');
const invitationRoutes = require('./routes/invitation.routes');
const workspaceMemberRoutes = require('./routes/workspacemember.routes');
const projectRoutes = require('./routes/project.routes');
const errorMiddleware = require('./middleware/error.middleware');
const app = express();

app.use(morgan('dev'));
app.use(cookieParser());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/workspaces', workspaceRoutes);
app.use('/api/workspaces/:workspaceId/invite', workspaceInviteRoutes);
app.use('/api/invitations', invitationRoutes);
app.use('/api/workspaces/:workspaceId/members', workspaceMemberRoutes);
app.use('/api/workspaces/:workspaceId/projects', projectRoutes);
app.get('/health', (req, res) => {
  console.log('Health check endpoint hit');
  res.status(200).json({
    status: 'ok',
    message: 'Health check endpoint',
  });
});

app.use(errorMiddleware);
module.exports = app;