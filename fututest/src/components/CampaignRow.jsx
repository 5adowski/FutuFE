import React from "react"
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import { useNavigate } from "react-router";




const CampaignRow = ({ name, keyWords, bid, fund, status, town, radius, id }) => {

    const navigate = useNavigate()

    const onClick = () => {
        navigate(`element/${id}`)
    }

    return (
        <TableRow onClick={onClick}>
            <TableCell>{name}</TableCell>
            <TableCell>{keyWords.join(', ')}</TableCell>
            <TableCell>{bid}</TableCell>
            <TableCell>{fund}</TableCell>
            <TableCell>{status}</TableCell>
            <TableCell>{town}</TableCell>
            <TableCell>{radius}</TableCell>
        </TableRow>
    )
}

export default CampaignRow

