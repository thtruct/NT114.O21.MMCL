import { isEmpty } from 'lodash';
// eslint-disable-next-line import/no-extraneous-dependencies
import { unmarshall } from '@aws-sdk/util-dynamodb';
// eslint-disable-next-line import/no-extraneous-dependencies
import {
  ScanCommand,
  QueryCommand,
  ScanCommandInput,
  QueryCommandInput,
} from '@aws-sdk/lib-dynamodb';
// eslint-disable-next-line import/no-extraneous-dependencies
import {
  AttributeValue,
  DynamoDBClient,
  GetItemCommand,
  PutItemCommand,
  DeleteItemCommand,
  UpdateItemCommand,
  GetItemCommandInput,
  PutItemCommandInput,
  DynamoDBClientConfig,
  BatchWriteItemCommand,
  DeleteItemCommandInput,
  UpdateItemCommandInput,
  BatchWriteItemCommandInput,
} from '@aws-sdk/client-dynamodb';

import { AWS_CONFIG } from '../config-global';

//
type TQueryCommandInput = {
  tableName: string;
  keyConditionExpression?: string;
  expressionAttributeValues?: Record<string, string>;
  expressionAttributeNames?: Record<string, string>;
  projectionExpression?: string[];
  filterExpression?: string;
  scanIndexForward?: boolean;
  limit?: number;
  nextToken?: string;
};

let clientConfig: DynamoDBClientConfig = {};

if (import.meta.env.VITE_APP_ENV === 'local') {
  // FOR LOCAL only
  clientConfig = {
    region: 'ap-southeast-1',
    credentials: {
      accessKeyId: AWS_CONFIG.accessKeyId || '',
      secretAccessKey: AWS_CONFIG.secretAccessKey || '',
    },
  };
}

const dynamoDBClient = new DynamoDBClient(clientConfig);

export const deleteItem = async (
  tableName: string,
  primaryKeyValue: Record<string, AttributeValue>
) => {
  const params: DeleteItemCommandInput = {
    TableName: tableName,
    Key: primaryKeyValue,
  };
  try {
    await dynamoDBClient.send(new DeleteItemCommand(params));
  } catch (e) {
    console.error('DDB deleteItem', e);
    throw e;
  }

  return true;
};

export const getItem = async (
  tableName: string,
  key: Record<string, AttributeValue>,
  projectionExpression: string[] = []
) => {
  try {
    const params: GetItemCommandInput = {
      TableName: tableName,
      Key: key,
    };

    if (projectionExpression.length) {
      params.ProjectionExpression = projectionExpression.join(',');
    }

    const command = new GetItemCommand(params);
    const data = await dynamoDBClient.send(command);

    return isEmpty(data.Item) ? null : unmarshall(data.Item);
  } catch (e) {
    console.error('DDB getItem error', e);
    throw e;
  }
};

export const putItem = async (tableName: string, item: Record<string, AttributeValue>) => {
  try {
    console.log('item', item);
    const params: PutItemCommandInput = {
      TableName: tableName,
      Item: item,
    };
    const command = new PutItemCommand(params);
    await dynamoDBClient.send(command);

    return true;
  } catch (e) {
    console.error('DDB putItem error', e);
    throw e;
  }
};

export const updateItem = async (
  tableName: string,
  key: Record<string, AttributeValue>,
  updateExpression: string,
  expressionAttributeValues: Record<string, AttributeValue>
) => {
  try {
    const params: UpdateItemCommandInput = {
      TableName: tableName,
      Key: key,
      UpdateExpression: updateExpression,
      ExpressionAttributeValues: expressionAttributeValues,
    };
    const command = new UpdateItemCommand(params);
    await dynamoDBClient.send(command);

    return true;
  } catch (e) {
    console.error('DDB updateItem error', e);
    throw e;
  }
};

export const queryItems = async (input: TQueryCommandInput) => {
  try {
    const params: QueryCommandInput = {
      TableName: input.tableName,
      KeyConditionExpression: input.keyConditionExpression,
      ExpressionAttributeValues: input.expressionAttributeValues,
      ExpressionAttributeNames: input.expressionAttributeNames,
      ScanIndexForward: !!input.scanIndexForward,
      Limit: input.limit,
      FilterExpression: input?.filterExpression,
      ProjectionExpression: input.projectionExpression?.length
        ? input.projectionExpression.join(',')
        : undefined,
      ExclusiveStartKey: input.nextToken
        ? JSON.parse(decodeURIComponent(input.nextToken))
        : undefined,
    };

    const command = new QueryCommand(params);
    const result = await dynamoDBClient.send(command);
    return {
      nextToken: result.LastEvaluatedKey
        ? encodeURIComponent(JSON.stringify(result.LastEvaluatedKey))
        : null,
      items: result.Items || [],
    };
  } catch (e) {
    console.error('DDB getItem error', e);
    throw e;
  }
};

export const scanItems = async (expression: {
  tableName: string;
  filterExpression: string;
  expressionAttributeValues?: Record<string, string | boolean | number>;
  limit?: number;
  startKey?: Record<string, string>;
  projectionExpression?: string[];
}) => {
  const params: ScanCommandInput = {
    TableName: expression.tableName,
    FilterExpression: expression.filterExpression,
    ExpressionAttributeValues: expression.expressionAttributeValues,
    Limit: expression.limit,
  };

  if (expression.startKey) {
    params.ExclusiveStartKey = expression.startKey;
  }

  if (expression.projectionExpression && expression.projectionExpression.length) {
    params.ProjectionExpression = expression.projectionExpression.join(',');
  }

  try {
    const command = new ScanCommand(params);
    const result = await dynamoDBClient.send(command);
    return {
      next_token: result.LastEvaluatedKey,
      items: result.Items,
    };
  } catch (e) {
    console.error('DDB scan Item', e);
    throw e;
  }
};

export const batchPutItems = async (tableName: string, items: Record<string, AttributeValue>[]) => {
  try {
    const params: BatchWriteItemCommandInput = {
      RequestItems: {
        [tableName]: items.map((item) => ({
          PutRequest: {
            Item: item,
          },
        })),
      },
    };
    const command = new BatchWriteItemCommand(params);
    await dynamoDBClient.send(command);

    return true;
  } catch (e) {
    console.error('DDB batchPutItems error', e);
    throw e;
  }
};
