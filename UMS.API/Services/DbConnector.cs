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
        private readonly string ConnectionString;

        public DbConnector(IConnectionProvider connectionProvider, IConfiguration configuration)
        {

            _connectionProvider = connectionProvider;
            var conString = configuration.GetConnectionString("DefaultConnection");
            var password = Environment.GetEnvironmentVariable("POSTGRES_PASSWORD");
            ConnectionString = conString.Replace("{PasswordPlaceholder}", password);
        }

        public async Task<IEnumerable<T>> QueryMultipleRows<T>(string query, object parameters = null)
        {
            IEnumerable<T> resultSet;
            using (var connection = _connectionProvider.CreateConnection(ConnectionString))
            {
                var reader = await connection.QueryMultipleAsync(query, parameters);
                resultSet = reader != null ? await reader.ReadAsync<T>() : null;
                return resultSet;
            }
        }

        public async Task<T> ExecuteScalarAsync<T>(string query, object parameters = null)
        {
            using (var connection = _connectionProvider.CreateConnection(ConnectionString))
            {
                return await connection.ExecuteScalarAsync<T>(query, parameters);
            }
        }

        public async Task<int> ExecuteAsync(string query, object parameters)
        {
            using (var connection = _connectionProvider.CreateConnection(ConnectionString))
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
