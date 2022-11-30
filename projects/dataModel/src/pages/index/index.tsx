import { history } from "@umijs/max"
import { Button } from "antd"

export default () => {
    return <div>
        <Button type='primary' onClick={() => {
            history.push('/detail')
        }}>点我去详情</Button>
        dataModelList
    </div>
}
