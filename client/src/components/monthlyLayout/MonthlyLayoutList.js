import React, { useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { CommentContext } from '../../providers/CommentProvider';
import CommentCard from './CommentCard';