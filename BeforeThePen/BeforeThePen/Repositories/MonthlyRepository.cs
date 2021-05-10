using BeforeThePen.Models;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using System.Collections.Generic;
using static BeforeThePen.Utils.DbUtlis;

namespace BeforeThePen.Repositories
{
    public class MonthlyRepository : BaseRepository, IMonthlyRepository
    {
        public MonthlyRepository(IConfiguration configuration) : base(configuration) { }

        //grab all of the monthly by user id
        public List<Monthly> GetMonthlyByUser(int userProfileId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @" SELECT m.Id, m.Month, m.Year, m.UserProfileId, m.Style,                                                
                                                up.Id AS UserProfileId, up.DisplayName, up.FirstName, up.LastName, up.Email
                                         From Monthly m
                                         LEFT JOIN UserProfile up ON up.id = m.UserProfileId
                                         WHERE up.Id = @userProfileId";

                    DbUtils.AddParameter(cmd, "@userProfileId", userProfileId);

                    var reader = cmd.ExecuteReader();
                    var monthly = new List<Monthly>();
                    while (reader.Read())
                    {
                        monthly.Add(NewMonthlyFromDb(reader));
                    }

                    reader.Close();

                    return monthly;
                }
            }
        }

        //get one monthly by its Id
        public Monthly GetMonthlyById( int monthlyId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @" SELECT m.Id, m.Month, m.Year, m.UserProfileId, m.Style,                                                                                              
                                                up.Id [UserProfileId], up.DisplayName, up.FirstName, up.LastName, up.Email
                                         From Monthly m                                                                          
                                         LEFT JOIN UserProfile up ON up.id = m.UserProfileId
                                         WHERE m.Id = @monthlyId";

                    DbUtils.AddParameter(cmd, "@monthlyId", monthlyId);

                    var reader = cmd.ExecuteReader();
                    Monthly monthly = null;

                    if (reader.Read())
                    {
                        monthly = NewMonthlyFromDb(reader);
                    }

                    reader.Close();
                    return monthly;
                }
            }
        }
        //add a new monthly 
        public void AddMonthly(Monthly monthly)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"INSERT INTO Monthly ( UserProfileId, Month, Year, Style)
                                        OUTPUT INSERTED.Id
                                        VALUES (@userProfileId, @month, @year, @style)";

                    DbUtils.AddParameter(cmd, "@userProfileId", monthly.UserProfileId);
                    DbUtils.AddParameter(cmd, "@month", monthly.Month);
                    DbUtils.AddParameter(cmd, "@year", monthly.Year);
                    DbUtils.AddParameter(cmd, "@style", monthly.Style);


                    monthly.Id = (int)cmd.ExecuteScalar();
                }
            }
        }

        //edit the monthly
        public void UpdateMonthly(Monthly monthly)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"UPDATE Monthly                                                                          
                                        SET UserProfileId = @userProfileId,                                         
                                            Month = @month,
                                            Year = @year,
                                            Style = @style,                                            
                                        WHERE Id = @id";

                    DbUtils.AddParameter(cmd, "@id", monthly.Id);
                    DbUtils.AddParameter(cmd, "@userProfileId", monthly.UserProfileId);
                    DbUtils.AddParameter(cmd, "@month", monthly.Month);
                    DbUtils.AddParameter(cmd, "@year", monthly.Year);
                    DbUtils.AddParameter(cmd, "@style", monthly.Style);

                    cmd.ExecuteNonQuery();
                }
            }
        }
        //delete the monthly
        public void DeleteMonthly(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"DELETE FROM Monthly WHERE Id = @id";

                    DbUtils.AddParameter(cmd, "@id", id);
                    cmd.ExecuteNonQuery();
                }
            }
        }

        //helper function  
        private Monthly NewMonthlyFromDb(SqlDataReader reader)
        {
            return new Monthly()
            {
                Id = DbUtils.GetInt(reader, "Id"),
                UserProfileId = DbUtils.GetInt(reader, "UserPRofileId"),
                Month = DbUtils.GetString(reader, "Month"),
                Year = DbUtils.GetInt(reader, "Year"),
                Style = DbUtils.GetString(reader, "Style"),
                UserProfile = new UserProfile()
                {
                    DisplayName = DbUtils.GetString(reader, "DisplayName"),
                    FirstName = DbUtils.GetString(reader, "FirstName"),
                    LastName = DbUtils.GetString(reader, "LastName"),
                    Email = DbUtils.GetString(reader, "Email")
                }
            };
        }
    }
}
