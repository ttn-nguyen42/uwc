import { useAuth } from "../../utils/hooks/UseAuth"
import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

import style from "./Login.module.scss";
import { Card, FilledInput, FormControl, FormHelperText, IconButton, InputAdornment, InputLabel, TextField } from "@mui/material";
import Button from "@mui/material/Button";

import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

export default function Login() {
    const auth = useAuth();
    const [hasError, setErrorStatus] = useState<boolean>(false);
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    return (auth.isAuthenticated ? <Navigate to="/" replace /> :
        <div className={style.wrapper}>
            <Card variant="outlined" className={style.card}>
                Waste Collection System 2.0
                <FormControl sx={{ s: 1 }} variant="filled">
                    <InputLabel htmlFor="input-username">Username</InputLabel>
                    <FilledInput id="input-username" size="small" error={hasError} value={username} onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                        setUsername(event.target.value);
                    }} />
                </FormControl>
                <FormControl sx={{ s: 1 }} variant="filled">
                    <InputLabel htmlFor="input-password">Password</InputLabel>
                    <FilledInput id="input-password" type={
                        showPassword ? "text" : "password"
                    } size="small" error={hasError}
                        value={password}
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                            setPassword(event.target.value);
                        }}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    onClick={() => {
                                        setShowPassword(!showPassword);
                                    }}
                                    onMouseDown={(event: React.MouseEvent<HTMLButtonElement>) => {
                                        event.preventDefault();
                                    }}
                                    edge="end"
                                >
                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                        } />
                    <FormHelperText error={hasError} filled={true}>{hasError ? "Incorrect password or username" : ""}</FormHelperText>
                </FormControl>
                <Button variant="contained" onClick={() => {
                    auth.login(username, password);
                    if (!auth.isAuthenticated) {
                        setErrorStatus(true);
                    }
                }}>Login</Button>
            </Card>
        </div>);
}