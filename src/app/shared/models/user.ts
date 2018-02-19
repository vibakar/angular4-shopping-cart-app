export interface User{
	name: string,
	email: string,
	isAdmin: boolean,
	address?: [{
		name:string,
		line1:string,
		line2:string,
		city:string
	}]
}