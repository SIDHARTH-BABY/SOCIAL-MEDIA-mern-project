
import React from 'react'
import { Form, Input, Button } from 'antd'
import axios from 'axios';
const OtpFormm = ({userDetails,otp,setPageType,setOtpField,setRegButton}) => {

    
    const onFinish = async (value) => {
        console.log(userDetails,'jkkkkkk',otp,'jjjjjjjjjjjjjjjjjjjjjjjjj');
        try {
          if (otp === value.otp) {
            axios
              .post("http://localhost:5000/auth/register", userDetails)
              .then((response) => {
                console.log(response, "response");
                setOtpField(false)
                setRegButton(true)
                setPageType("login")
               
              });
          } else {
            console.log("otp incorrect");
          }
        } catch (error) {
          console.log(error);
        }
      };
  return (
    <div>
       <Form layout="vertical" onFinish={onFinish}>
          <Form.Item label="Otp" name="otp">
            <Input placeholder="Otp " />
          </Form.Item>

          <div className="d-flex flex-column">
            <Button
              className="primary-button my-2"
              htmlType="submit"
             
            >
              Register
            </Button>
          </div>
        </Form>
    </div>
  )
}

export default OtpFormm
