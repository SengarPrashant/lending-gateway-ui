import { useState } from 'react';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Stack from 'react-bootstrap/Stack';
import { Button, FormLabel } from 'react-bootstrap';
import { users } from './common/utils';
import { Logo } from './components/Logo';

function Login() {
    const [data, setData] = useState({ username: '', password: '' });
    const [error, setError] = useState({ username: '', password: '', global: '' });

    const onChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
        if (e.target.value) {
            setError({ ...error, global: '', [e.target.name]: '' })
        }
    }

    const onSubmit = () => {
        localStorage.removeItem('name');
        let err = {};
        if (!data.username) err['username'] = "User name is required"
        if (!data.password) err['password'] = "Password is required"
        if (Object.keys(err).length > 0) {
            setError({ ...error, ...err });
            return;
        }
        let searchUser = users.find(
            x => x.racf == data.username.toLocaleLowerCase().trim()
                && x.pwd == data.password.trim())

        if (!searchUser) err['global'] = "Invalid username or password."

        if (Object.keys(err).length > 0) {
            setError({ ...error, ...err });
            return;
        };
        setError({ username: '', password: '', global: '' });
        localStorage.setItem('name', searchUser.name);
        window.location.reload();
    }


    return (
        <div style={{ height: 'calc(100vh - 0px)', backgroundColor: '#e3d4ff' }}>
            <Stack gap={2} className="col-md-5 mx-auto" style={{ height: 'calc(100vh - 0px)' }}>
                <Card style={{ width: '22rem', padding: '1em', margin: 'auto', textAlign: 'center' }}>
                    <Card.Body style={{ paddingBottom: 0 }}>
                        <Card.Title>
                            <div><Logo /></div>
                            Loan central
                        </Card.Title>
                    </Card.Body>
                    <Card.Body style={{ textAlign: 'left', paddingTop:0 }}>
                        <Row>
                            <Col sm={12}>
                                <Form.Label htmlFor="txtUserName">Username</Form.Label>
                                <Form.Control
                                    type="text" name='username'
                                    id="txtUserName"
                                    aria-describedby="racf"
                                    aria-label='Racf id'
                                    onChange={onChange}
                                />
                                <FormLabel xs className='err' style={{ visibility: error.username ? 'visible' : 'hidden' }}>
                                    {error.username}
                                </FormLabel>
                            </Col>
                            <Col sm={12} style={{ paddingTop: 0 }}>
                                <Form.Label htmlFor="inputPassword5">Password</Form.Label>
                                <Form.Control
                                    name='password'
                                    type="password"
                                    id="inputPassword5"
                                    onChange={onChange}
                                    aria-label='password'
                                />
                                <FormLabel xs className='err' style={{ visibility: error.password ? 'visible' : 'hidden' }}>
                                    {error.password}
                                </FormLabel>
                            </Col>
                            <Col sm={12} style={{ paddingTop: 8 }}>
                                <Form.Check type="checkbox"
                                    id={`rememberMe`} label={`Remember me`} />
                            </Col>
                            <Col sm={12} style={{ paddingTop: 16 }}>
                                <Button aria-label='Sign in' style={{ width: '100%' }}
                                    onClick={onSubmit} size='md'>Sign in</Button>
                            </Col>
                            <Col sm={12} style={{ paddingTop: 8 }}>
                                <FormLabel xs className='err' style={{ visibility: error.global ? 'visible' : 'hidden' }}>
                                    {error.global}
                                </FormLabel>
                            </Col>
                            <div className='center'>
                                <a href='#'>Request access</a>
                            </div>
                        </Row>
                    </Card.Body>
                </Card>
            </Stack>
        </div>
    );
}

export default Login;