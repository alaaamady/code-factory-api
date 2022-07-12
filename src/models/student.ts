import client from "../database";

export type Student = {
  id: number;
  first_name: string;
  last_name: string
  email: string;
  age: number;
  gender: string;
  country: string;

};

async function index() {
  const connection = await client.connect();
  const result = await connection.query("SELECT * FROM student");
  connection.release();
  return result.rows;
}

async function add(student: Omit<Student, "overallGrade">): Promise<Student> {
  const connection = await client.connect();
  const result = await connection.query<Student>(
    'INSERT INTO student (id, first_name, last_name, email, age, gender, country) VALUES ($1, $2, $3, $4, $5, $6, $7)',
    [student.id, student.first_name,student.last_name,  student.email, student.age, student.gender, student.country ]
  );
  connection.release();
  return result.rows[0];
}

async function get(id: number): Promise<Student> {
  const connection = await client.connect();
  const result = await connection.query<Student>(
    'SELECT  * FROM student WHERE id = $1',
    [id]
  );
  connection.release();
  if (result.rowCount === 0) throw new Error("Student not found");
  return result.rows[0];
}

export function makeStudentStore() {
  return {
    index,
    add,
    get,
  };
}
