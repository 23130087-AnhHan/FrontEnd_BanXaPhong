const initState = {
    users: [
        {id:1, name: Hưng},
        {id:2, name: Hàn},
        {id:3, name: Thư}
    ]
}
const rootReducer = (state = initState, action) =>{
    switch (action.type) {
        case 'DELETE_USER':
            console.log("test delete", user)
            return state;
            break;
        default:
            return state;
    }
}

// const mapStateToProps = (state)  =>{
//     return {
//         dataRedux : state.users
//     }
// }
// const mapDispatchToProps = (dispath) =>{
//     return {
//         deleteUserRedux:() => dispath(
//             {type: 'DELETE_USER', payload : userDetele}
//         )
//     }
// }

export default  rootReducer;