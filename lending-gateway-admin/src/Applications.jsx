import { useState, useEffect } from "react";
import { Button, Container, Form } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import Stack from "react-bootstrap/Stack";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import StatusUpdateModal from "./components/StatusUpdate";
import LoadingPlaceholder from "./components/LoadingPlaceholder";
import axios from "axios";
import { downloadFiles } from "./common/utils";

function Applications() {
    const [current, setCurrent] = useState(null);
    const [data, setData] = useState([]);
    const [apiData, setApiData] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        loadData();
    }, []);

    const loadData = () => {
        setLoading(true);
        const loanAdminApplicationsUrl =
            import.meta.env.VITE_LOAN_ADMIN_BASE_URL +
            import.meta.env.VITE_LOAN_ADMIN_APPLICATIONS_ENDPOINT;
        console.log("Loan Admin Applications Endpoint:" + loanAdminApplicationsUrl);
        axios
            .get(loanAdminApplicationsUrl)
            .then((res) => {
                setApiData([...res.data?.data].reverse());
                setData([...res.data?.data].reverse());
                setLoading(false);
            })
            .catch((err) => {
                setLoading(false);
            });
    };

    const onModalclose = (reload = false) => {
        reload && loadData();
        setCurrent(null);
    };

    const onUpdate = (_data) => {
        setCurrent(_data);
    };

    const onSearch = (e) => {
        const filterd = apiData.filter((x) =>
            `${x.arn}${x.fullName}${x.mobile}${x.email}`
                .toLowerCase()
                .includes(e.target.value.toLowerCase())
        );
        setData([...filterd]);
    };

    return (
        <>
            <StatusUpdateModal
                open={current !== null}
                onClose={onModalclose}
                data={current}
            />
            <Container style={{ paddingTop: "1em", paddingBottom: "2em" }}>
                {loading && <LoadingPlaceholder />}
                {!loading && (
                    <>
                        <Stack direction="horizontal" gap={3}>
                            <div className="p-2">
                                <h3>Manage Loan Applications</h3>
                            </div>
                            <div className="p-2 ms-auto">
                                <Form.Label className="visually-hidden">
                                    Filter text (Name/Email/Mobile/ARN)
                                </Form.Label>
                                <Form.Control
                                    type="text"
                                    name="filter"
                                    id="txtfilter"
                                    aria-label="Filter text (Name/Email/Mobile/ARN)"
                                    placeholder="Search..."
                                    onChange={onSearch}
                                />
                            </div>
                        </Stack>
                        {data.map((item, i) => (
                            <Card className="mb-3 shadow-sm rounded" border="secondary" key={item.arn}>
                                <Card.Body>
                                    <Row>
                                        <Col sm={12} lg={4}>
                                            <strong>{item.fullName}</strong>
                                            <div>
                                                Pan: <small>{item.pan}</small>
                                            </div>
                                            <div>
                                                Aadhaar: <small>{item.aadhaar}</small>
                                            </div>
                                            <div>
                                                {" "}
                                                <svg aria-hidden="true"
                                                    style={{ marginRight: 8 }}
                                                    width="16px" height="16px" viewBox="0 0 28 28">
                                                    <g id="phone" stroke="none" stroke-width="1"
                                                        fill="none" fill-rule="evenodd">
                                                        <g
                                                            id="ic_fluent_phone_28_filled"
                                                            fill="green"
                                                            fill-rule="nonzero"
                                                        >
                                                            <path
                                                                d="M7.84951476,2.70321839 L9.78645772,2.11937383 C11.1089609,1.72073725 12.5219622,2.36497137 13.088316,3.62480045 L14.4461458,6.64523332 C14.9288844,7.71906404 14.6744902,8.98106875 13.8134316,9.78401765 L11.7464593,11.7114724 C11.4687963,11.9740537 11.6785347,12.998993 12.6913565,14.7532518 C13.7041783,16.5075106 14.4869326,17.201619 14.8481415,17.0939635 L17.5563375,16.2659826 C18.6819332,15.9218525 19.9017384,16.3322192 20.5904495,17.2867181 L22.5201201,19.9610886 C23.3262299,21.0782929 23.1812671,22.6195811 22.1809838,23.5668886 L20.6889924,24.979863 C19.7084001,25.9085296 18.3041887,26.2381717 17.0127872,25.8428632 C13.8869514,24.8860193 10.9918583,22.0457163 8.28853263,17.3634189 C5.58042572,12.6728401 4.55654474,8.71743221 5.26990283,5.48544144 C5.56257182,4.15936442 6.54930324,3.09513567 7.84951476,2.70321839 Z"
                                                                id="🎨-Color"
                                                            ></path>
                                                        </g>
                                                    </g>
                                                </svg>
                                                <small>
                                                    <a href={`tel:${item.mobile}`}>{item.mobile}</a>
                                                </small>
                                            </div>
                                            <div>
                                                <svg
                                                    fill="#ff4136"
                                                    aria-hidden="true"
                                                    style={{ marginRight: 8 }}
                                                    width="16px"
                                                    height="16px"
                                                    viewBox="0 0 96 96"
                                                >
                                                    <path d="M90,12H6a5.9966,5.9966,0,0,0-6,6V78a5.9966,5.9966,0,0,0,6,6H90a5.9966,5.9966,0,0,0,6-6V18A5.9966,5.9966,0,0,0,90,12ZM84,24v2.5188L48,47.0918,12,26.5188V24ZM12,72V40.3381L45.0234,59.209a5.9961,5.9961,0,0,0,5.9532,0L84,40.3381V72Z" />
                                                </svg>
                                                <small>
                                                    <a href={`tel:${item.email}`}>{item.email}</a>
                                                </small>
                                            </div>
                                        </Col>
                                        <Col sm={12} lg={4}>
                                            <strong>{item.arn}</strong>
                                            <div>
                                                Loan Type: <small>{item.productCode}</small>
                                            </div>
                                            <div>
                                                Loan Amount:{" "}
                                                <small>₹{item.amount.toLocaleString("en-IN")}</small>
                                            </div>
                                            <div>
                                                Tenure: <small>{item.tenureMonths} Months</small>
                                            </div>
                                            <div>
                                                Interest Rate:{" "}
                                                <small>{item.interestRate.toFixed(2)}%</small>
                                            </div>
                                        </Col>
                                        <Col sm={12} lg={4}>
                                            <div>
                                                EMI:{" "}
                                                <small>
                                                    ₹{Number(item.emi.toFixed(2)).toLocaleString("en-IN")}
                                                </small>
                                            </div>
                                            <div>
                                                Occupation: <small>{item.occupation}</small>
                                            </div>
                                            <div>
                                                Annual Income:{" "}
                                                <small>
                                                    ₹{item.annualIncome.toLocaleString("en-IN")}
                                                </small>
                                            </div>
                                            <div>
                                                Status:{" "}
                                                <span
                                                    className={`status ${item.status ? item.status.replace("-", "") : 'SUBMITTED'}`}>
                                                    {item.status || "SUBMITTED"}
                                                </span>
                                            </div>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col>

                                        </Col>
                                        <Col>

                                        </Col>
                                    </Row>
                                    <div className="pullRight">
                                        <Stack direction="horizontal" gap={3}>
                                            <div className="remarks">
                                                Remarks: {" "}
                                                {item.remarks || 'NA'}</div>
                                            <div className="ms-auto">
                                                <Button
                                                    variant="outline-primary"
                                                    aria-label="View documents"
                                                    onClick={() => downloadFiles(item.documentsBase64)}
                                                    size="sm"
                                                    style={{ marginRight: 16 }}
                                                >
                                                    <svg
                                                        width="16px"
                                                        height="16px"
                                                        style={{ marginRight: 4 }}
                                                        viewBox="0 0 24 24"
                                                        fill="none"
                                                    >
                                                        <path
                                                            stroke="currentColor"
                                                            stroke-linejoin="round"
                                                            stroke-width="2"
                                                            d="M13 3V10H20M6 7H5C4.44772 7 4 7.44772 4 8V20C4 20.5523 4.44772 21 5 21H14C14.5523 21 15 20.5523 15 20V19M8 4V16C8 16.5523 8.44772 17 9 17H19C19.5523 17 20 16.5523 20 16V9.38898C20 9.13879 19.9062 8.89769 19.7372 8.71326L14.7973 3.32428C14.6078 3.11765 14.3404 3 14.0601 3H9C8.44772 3 8 3.44772 8 4Z"
                                                        />
                                                    </svg>
                                                    View documents
                                                </Button>
                                                <Button variant="outline-primary" disabled={item.status=='DISBURSED'}
                                                    aria-label="Update application status" onClick={() => onUpdate(item)}
                                                    size="sm">
                                                    <svg fill="currentColor"
                                                        style={{ marginRight: 4 }}
                                                        width="16px" height="16px" viewBox="0 0 24 24"
                                                        xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M21.71,4.72,19.28,2.29a1,1,0,0,0-1.41,0L12.29,7.87a1,1,0,0,0-.29.71V11a1,1,0,0,0,1,1h2.42a1,1,0,0,0,.71-.29l5.58-5.58A1,1,0,0,0,21.71,4.72ZM15,10H14V9l4.58-4.58,1,1Zm4,2h0a1,1,0,0,0-1,1,7,7,0,0,1-7,7H5.41l.64-.63a1,1,0,0,0,0-1.42A7,7,0,0,1,11,6a1,1,0,0,0,0-2h0A9,9,0,0,0,4,18.62L2.29,20.29a1,1,0,0,0-.21,1.09A1,1,0,0,0,3,22h8a9,9,0,0,0,9-9A1,1,0,0,0,19,12Z" />
                                                    </svg>
                                                    Update
                                                </Button>
                                            </div>
                                        </Stack>
                                    </div>
                                </Card.Body>
                            </Card>
                        ))}
                    </>
                )}
            </Container>
        </>
    );
}

export default Applications;
