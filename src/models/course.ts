import client from "../database";

export type BaseCourse = {
    id: number;
    course_name: string;
    published_at: Date;
    category: string;
    course_duration: number;
  };

  async function index() {
    const connection = await client.connect();
    const result = await connection.query("SELECT * FROM course");
    connection.release();
    return result.rows;
  }



  async function get(id: number): Promise<BaseCourse> {
    const connection = await client.connect();
    const result = await connection.query<BaseCourse>(
      "SELECT * FROM course WHERE id = $1",
      [id]
    );
    connection.release();
    if (result.rowCount === 0) throw new Error("BaseCourse not found");
    return result.rows[0];
  }

  export function makeCourseStore() {
    return {
      index,
      get,
    };
  }