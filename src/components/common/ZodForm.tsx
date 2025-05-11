import { createSchemaFieldRule } from 'antd-zod';
import { z } from 'zod';
import type { RuleRender } from 'rc-field-form/lib/interface';

/**
 * Create form rule from Zod schema for use with Form.Item
 * This helper function wraps antd-zod's createSchemaFieldRule
 * for a more convenient API when working with Form.Item rules.
 *
 * @param schema Zod schema to create rule from
 * @returns A form rule compatible with Ant Design Form.Item
 */
export const createZodFieldRule = (schema: z.ZodTypeAny): RuleRender => {
  // This is a workaround to make antd-zod work with all Zod schema types
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return createSchemaFieldRule(schema as any);
};
