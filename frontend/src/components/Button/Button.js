import React from 'react'
import { Button } from 'antd';

import { getTest } from '../../services/testServices';

const ButtonComponent = () => {
  const handleClick = async () => {
    console.log("clicked")
    let response = await getTest({});
    console.log(response.data);
  }
  return (
    <div>
        <Button onClick={handleClick}>
            Get Tenants
        </Button>
    </div>
  )
}

export default ButtonComponent