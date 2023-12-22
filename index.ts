import typeDefs from './typedefs'
import resolvers from './resolvers'
import {ApolloServer} from '@apollo/server'
import {startStandaloneServer} from '@apollo/server/standalone'
import {config} from 'dotenv'
import {connect} from 'mongoose'

config()


const server = new ApolloServer({
    typeDefs,
    resolvers
})


const startServer = async()=>{
    const {url} =  await startStandaloneServer(server,{
        listen: {
            //@ts-ignore
            port:process.env.listening_port
        }
    })

    
    //@ts-ignore
    await connect(process.env.mongo_db_url)

    console.log(`server started at : ${url} and connented to mongodb`)
}

startServer()





