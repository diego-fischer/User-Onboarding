import styled from 'styled-components'
import React from 'react'

const UserCardDiv = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	width: 100%;
	border: 1px solid black
`

export default function UserCard(props){

	return(
	<UserCardDiv>
		<p>Name: {props.name}</p>
		<p>Email: {props.email}</p>
		<p>Passowrd: {props.pass}</p>
		<p>ID: {props.id}</p>
		<p>Created At: {props.createdAt}</p>
	</UserCardDiv>
	)

}
