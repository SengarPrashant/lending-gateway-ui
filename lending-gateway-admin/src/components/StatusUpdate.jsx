import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import axios from 'axios';

function StatusUpdateModal({ open = false, onClose = () => { }, data = {} }) {
    const [formdata, setFormData] = useState({});
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setFormData({ status: data?.status || '', remarks: data?.remarks })
    }, [data])
    const onChange = (e) => {
        setFormData({ ...formdata, [e.target.name]: e.target.value })
    }
    const handleSubmit = (event) => {
        //setLoading(true);
        const req = { ...formdata, arn: data.arn }
        onClose(true)
        // axios.put('https://bankadminapi.bsite.net/api/v1/LoanAdmin/applications', req).then(res => {
        //     setLoading(false);
        //     setFormData({})
        // }).catch(err => {
        //     setLoading(false);
        // })
    };
    return (
        <>
            <Modal show={open} centered onHide={()=>onClose(false)} backdrop="static" autoFocus>
                <Modal.Header closeButton>
                    <Modal.Title>Modal heading</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Col sm={12} style={{ paddingTop: 0 }}>
                        <Form.Label htmlFor="txtStatus">Status</Form.Label>
                        <Form.Select required onChange={onChange} id="txtStatus" aria-label="Select status">
                            <option selected={formdata?.status == 'SUBMITTED'} value="SUBMITTED">SUBMITTED</option>
                            <option selected={formdata?.status == 'IN-REVIEW'} value="IN-REVIEW">IN-REVIEW</option>
                            <option selected={formdata?.status == 'APPROVED'} value="APPROVED">APPROVED</option>
                            <option selected={formdata?.status == 'PARTIAL-APPROVED'} value="PARTIAL-APPROVED3">PARTIAL-APPROVED</option>
                            <option selected={formdata?.status == 'REJECTED'} value="REJECTED">REJECTED</option>
                            <option selected={formdata?.status == 'DISBURSED'} value="DISBURSED">DISBURSED</option>
                        </Form.Select>
                    </Col>
                    <Col sm={12} style={{ paddingTop: 16 }}>
                        <Form.Label htmlFor="txtRemarks">Remarks</Form.Label>
                        <Form.Control as="textarea"
                            type="text" name='remarks'
                            id="txtRemarks"
                            aria-label='Remarks'
                            onChange={onChange} value={formdata.remarks}
                        />
                    </Col>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="outline-primary" onClick={()=>onClose(false)}>
                        Cancel
                    </Button>
                    <Button variant="primary" disabled={loading} onClick={handleSubmit}>
                        {loading ? 'Please wait..' : 'Update'}
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default StatusUpdateModal
