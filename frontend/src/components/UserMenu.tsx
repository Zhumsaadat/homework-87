import React, {useState} from 'react';
import {Button, Menu, MenuItem} from '@mui/material';
import {useNavigate} from 'react-router-dom';
import { UserTypes } from '../types';
import { useAppDispatch } from '../app/hooks';
import { logout } from '../features/Users/usersThunks';

interface Props {
    user: UserTypes;
}

const UserMenu: React.FC<Props> = ({user}) => {
    const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const postNavigate = () => {
        navigate('/new');
    };

    const handleLogout = () => {
        dispatch(logout());
    };

    return (
        <>
            <Button color="inherit" onClick={handleClick}>
                Hello, {user.username}!
            </Button>
            <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose} keepMounted>
                <MenuItem onClick={postNavigate}>Add new post</MenuItem>
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </Menu>
        </>
    );
};

export default UserMenu;