import dotenv from 'dotenv'

import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'
import { workout} from './schema'
import { PgTable } from 'drizzle-orm/pg-core'

dotenv.config({ path: '.env.local' })

const connectionString: string = process.env.SUPABASE_DB_POOLER! || ""

// Disable prefetch as it is not supported for "Transaction" pool mode
export const client = postgres(connectionString, { prepare: false })
export const db = drizzle(client);