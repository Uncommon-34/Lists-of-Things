import { sql } from "./database_conection";
import {
  emailOnSuport,
  emailReport,
  emailReportOnStatusChange,
} from "./email_functions";
import {
  User,
  WorkOrder,
  Support,
  Report,
  Article,
  WorkOrderStatus,
} from "./types/database";

// user functions

export const createUser = async (
  name: string,
  email: string,
  pw_hash: string,
  type: User["type"]
) => {
  const [user] = await sql<User[]>`
    INSERT INTO "user" (name, email, pw_hash, type)
    VALUES (${name}, ${email}, ${pw_hash}, ${type})
    RETURNING *;
  `;
  return user;
};

export const getUserByEmail = async (email: string) => {
  const [user] = await sql<User[]>`
    SELECT * FROM "user" WHERE email = ${email};
  `;
  return user;
};

export const getUserById = async (id: number) => {
  const [user] = await sql<User[]>`
    SELECT * FROM "user" WHERE id = ${id};
  `;
  return user;
};

export const getAllUsers = async () => {
  return await sql<User[]>`
    SELECT * FROM "user" ORDER BY created_at DESC;
  `;
};

export const getAllWorker = async () => {
  return await sql<any>`
    SELECT id, name, email
    FROM "user"
    WHERE "type" = 'worker'
    ORDER BY name;

  `;
};

export const getAdmin = async (userid: string) => {
  return await sql<any>`
    SELECT name, email
    FROM "user"
    WHERE "id" = ${userid}
    ORDER BY name;

  `;
};

export const deleteUser = async (id: number) => {
  return await sql<any>`
    DELETE FROM "user"
    WHERE id = ${id} AND type = 'worker'
    RETURNING id, name, email;
  `;
};

export const makeAdmin = async (id: number) => {
  return await sql<any>`
    UPDATE "user"
    SET type = 'admin'
    WHERE id = ${id} AND type = 'worker'
    RETURNING id, name, email, type;
  `;
};

export const updateUser = async ({
  id,
  name,
  email,
  pw_hash,
}: {
  id: number;
  name?: string;
  email?: string;
  pw_hash?: string;
}) => {
  const updates: string[] = [];
  const values: any[] = [];
  let index = 1;

  if (name !== undefined) {
    updates.push(`name = $${index++}`);
    values.push(name);
  }

  if (email !== undefined) {
    updates.push(`email = $${index++}`);
    values.push(email);
  }

  if (pw_hash !== undefined) {
    updates.push(`pw_hash = $${index++}`);
    values.push(pw_hash);
  }

  if (updates.length === 0) {
    throw new Error("No fields to update");
  }

  const query = `
    UPDATE "user"
    SET ${updates.join(", ")}
    WHERE id = ${id}
    RETURNING *;
  `;

  const [user] = await sql.unsafe(query, values);
  return user;
};

//  report functions

export const createReport = async (
  report: Omit<Report, "id" | "created_at">
) => {
  const [newReport] = await sql<Report[]>`
    INSERT INTO "report" (
      description, street, city, zip, country,
      email, image_urls, is_private, is_anonymous
    )
    VALUES (
      ${report.description ?? ""}, ${report.street ?? ""}, ${report.city ?? ""},
      ${report.zip ?? ""}, ${report.country ?? ""}, ${report.email ?? null},
      ${sql.json(report.image_urls)}, ${report.is_private}, ${
    report.is_anonymous
  }
    )
    RETURNING *;
  `;
  emailReport(newReport);
  return newReport;
};

export const getReportById = async (id: number) => {
  const [report] = await sql<Report[]>`
    SELECT * FROM "report" WHERE id = ${id};
  `;
  return report;
};

export const getAllReports = async () => {
  return await sql<Report[]>`
    SELECT 
      r.id,
      r.description,
      r.street,
      r.city,
      r.zip,
      r.country,
      r.email,
      r.image_urls,
      r.is_private,
      r.is_anonymous,
      r.created_at,
      w.status,
      w.handled_by
    FROM report r
    JOIN work_order w ON r.id = w.report_id;
      `;
};

export const getReportsByWorkerId = async (workerId: number) => {
  return await sql<Report & WorkOrder[]>`
    SELECT
      r.id,
      r.description,
      r.street,
      r.city,
      r.zip,
      r.country,
      r.email,
      r.image_urls,
      r.is_private,
      r.is_anonymous,
      r.created_at,
      w.status,
      w.handled_by
    FROM report r
    JOIN work_order w ON r.id = w.report_id
    WHERE w.handled_by = ${workerId};
  `;
};

export const deleteReport = async (id: number) => {
  await sql`
    DELETE FROM "report" WHERE id = ${id};
  `;
};

export const getPublicReports = async () => {
  return await sql<Report[]>`
    SELECT * FROM "report"
    WHERE is_private = FALSE
    ORDER BY created_at DESC;
  `;
};

// workorder functions
export const createWorkOrder = async (
  report_id: number,
  handled_by?: number
) => {
  const [wo] = await sql<WorkOrder[]>`
    INSERT INTO "work_order" (report_id, handled_by)
    VALUES (${report_id}, ${handled_by ?? null})
    RETURNING *;
  `;
  return wo;
};

export const getWorkOrderById = async (id: number) => {
  const [wo] = await sql<WorkOrder[]>`
    SELECT * FROM "work_order" WHERE id = ${id};
  `;
  return wo;
};

export const assignWorkOrderHandler = async (
  id: number,
  handled_by: number
) => {
  const [updated] = await sql<WorkOrder[]>`
    UPDATE "work_order"
    SET handled_by = ${handled_by}
    WHERE report_id = ${id}
    RETURNING *;
  `;
  return updated;
};

export const setWorkOderStatus = async (
  id: number,
  status: WorkOrderStatus
) => {
  const [updated] = await sql<WorkOrder[]>`
    UPDATE "work_order"
    SET status = ${status}
    WHERE report_id = ${id}
    RETURNING *;
  `;
  const report = await getReportById(id);
  emailReportOnStatusChange(report, updated);
  return updated;
};

export const getWorkOrdersByHandler = async (handled_by: number) => {
  return await sql<WorkOrder[]>`
    SELECT * FROM "work_order" WHERE handled_by = ${handled_by}
    ORDER BY created_at DESC;
  `;
};

export const getAllWorkOrders = async () => {
  return await sql<WorkOrder[]>`
    SELECT * FROM "work_order" ORDER BY created_at DESC;
  `;
};

// support functions

export const createSupportReport = async (
  title: string,
  description: string,
  email: string
) => {
  const [support] = await sql<Support[]>`
    INSERT INTO "support" (title, description, email)
    VALUES (${title}, ${description}, ${email})
    RETURNING *;
  `;
  emailOnSuport(support);
  return support;
};

export const getAllSupportReports = async () => {
  return await sql<Support[]>`
    SELECT * FROM "support" ORDER BY id DESC;
  `;
};

// article functions

export const getAllArticles = async () => {
  return await sql<Omit<Article, "md">[]>`
    SELECT title, description, img, md, slug, is_featured, created_at
    FROM "articles"
    ORDER BY created_at ASC;
  `;
};

export const getAllFeaturedArticles = async () => {
  return await sql<Omit<Article, "md">[]>`
    SELECT title, description, img, slug, is_featured, created_at
    FROM "articles"
    WHERE is_featured = true
    ORDER BY created_at ASC;
  `;
};

export const getArticleMdBySlug = async (slug: string) => {
  const [article] = await sql<{ md: string }[]>`
    SELECT md FROM "articles" WHERE slug = ${slug};
  `;
  return article;
};

export const createArticle = async (
  title: string,
  description: string,
  img: string,
  slug: string,
  md: string = "",
  is_featured: boolean = false
) => {
  const [article] = await sql<Article[]>`
    INSERT INTO "articles" (title, description, img, slug, md, is_featured)
    VALUES (${title}, ${description}, ${img}, ${slug}, ${md}, ${is_featured})
    RETURNING *;
  `;
  return article;
};

export const updateArticle = async (
  title: string,
  description: string,
  img: string,
  slug: string,
  md: string = "",
  is_featured: boolean = false
) => {
  const [article] = await sql<Article[]>`
    INSERT INTO "articles" (title, description, img, slug, md, is_featured)
    VALUES (${title}, ${description}, ${img}, ${slug}, ${md}, ${is_featured})
    ON CONFLICT (title) DO UPDATE SET
      description = EXCLUDED.description,
      img = EXCLUDED.img,
      slug = EXCLUDED.slug,
      md = EXCLUDED.md,
      is_featured = EXCLUDED.is_featured
    RETURNING *;
  `;
  return article;
};

export const deleteArticle = async (title: string): Promise<boolean> => {
  const result = await sql`
    DELETE FROM "articles"
    WHERE title = ${title};
  `;
  return result.count > 0;
};
