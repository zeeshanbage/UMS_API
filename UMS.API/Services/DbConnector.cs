namespace UMS.API.Services
{
    using System;
    using System.Collections;
    using System.Collections.Generic;
    using System.Data;
    using System.Threading.Tasks;
    using Amazon.Runtime;
    using Dapper;

    public class DbConnector
    {
        private readonly IConnectionProvider _connectionProvider;
        private readonly string _connectionString;

        public DbConnector(IConnectionProvider connectionProvider, IConfiguration configuration)
        {
            _connectionProvider = connectionProvider;
            _connectionString = configuration["ConnectionStrings:DefaultConnection"];
        }

        public async Task<IEnumerable<T>> QueryMultipleRows<T>(string query, object parameters = null)
        {
            IEnumerable<T> resultSet;
            using (var connection = _connectionProvider.CreateConnection(_connectionString))
            {
                var reader = await connection.QueryMultipleAsync(query, parameters);
                resultSet = reader != null ? await reader.ReadAsync<T>() : null;
                return resultSet;
            }
        }

        public async Task<T> QueryFirstOrDefaultAsync<T>(string query, object parameters = null)
        {
            using (var connection = _connectionProvider.CreateConnection(_connectionString))
            {
                try
                {
                    T resultSet;
                    var reader = await connection.QueryFirstOrDefaultAsync(query, parameters);
                    resultSet = reader != null ? await reader.ReadAsync<T>() : null;
                    return resultSet;
                }
                catch (Exception ex)
                {
                    Console.WriteLine($"Error executing query: {ex.Message}");
                    throw;
                }
            }
        }

        public async Task<T> ExecuteScalarAsync<T>(string query, object parameters = null)
        {
            using (var connection = _connectionProvider.CreateConnection(_connectionString))
            {
                return await connection.ExecuteScalarAsync<T>(query, parameters);
            }
        }

        public async Task<int> ExecuteAsync(string query, object parameters)
        {
            using (var connection = _connectionProvider.CreateConnection(_connectionString))
            {
                return await connection.ExecuteAsync(query, parameters);
            }
        }
    }

    public interface IConnectionProvider
    {
        IDbConnection CreateConnection(string connectionString);
    }

    public class NpgsqlConnectionProvider : IConnectionProvider
    {
        public IDbConnection CreateConnection(string connectionString)
        {
            return new Npgsql.NpgsqlConnection(connectionString);
        }
    }
}
