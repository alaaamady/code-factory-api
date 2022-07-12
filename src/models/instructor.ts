import client from "../database";

type Instructor = {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
};

async function index() {
  const connection = await client.connect();
  const result = await connection.query("SELECT * FROM instructor");
  connection.release();
  return result.rows;
}

async function add(instructor: Instructor): Promise<Instructor> {
  const connection = await client.connect();
  const result = await connection.query<Instructor>(
    "INSERT INTO instructor (id, email, first_name, last_name) VALUES ($1, $2, $3, $4) RETURNING *;",
    [instructor.id, instructor.email, instructor.first_name, instructor.last_name]
  );
  connection.release();
  return result.rows[0];
}



async function get(id: number): Promise<Instructor> {
  const connection = await client.connect();
  const result = await connection.query<Instructor>(
    "SELECT * FROM instructor WHERE id = $1",
    [id]
  );
  connection.release();
  if (result.rowCount === 0) throw new Error("Instructor not found");
  return result.rows[0];
}

export function makeInstructorStore() {
  return {
    index,
    add,
    get,
  };
}
