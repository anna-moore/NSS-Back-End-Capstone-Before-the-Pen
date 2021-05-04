using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BeforeThePen.Models;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using static BeforeThePen.Utils.DbUtlis;

//update SQL and the parameters
namespace BeforeThePen.Repositories
{
    public class MonthlyLayoutRepository : BaseRepository 
    {
        public MonthlyLayoutRepository(IConfiguration configuration) : base(configuration) { }

        //gathers all monthly layouts for a specfic user

        public List<MonthlyLayout> GetMonthlyLayoutsByUser(int id, int MonthlyId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @" SELECT ml.Id, ml.MonthlyId, ml.LayoutId, ml.InspiredBy, ml.ImageURL, ml.ResourceId, ml.Style, m.id [MonthlyId],
                                                up.Id [UserProfileId], up.DisplayName, up.FirstName, up.LastName, up.Email
                                         From MonthlyLayout ml
                                         LEFT JOIN Monthly m ON m.Id = ml.MonthlyId 
                                         LEFT JOIN UserProfile up ON up.id = m.UserProfileId
                                         WHERE up.Id = @id AND ml.MonthlyId = @monthlyId";

                    cmd.Parameters.AddWithValue("@id", id);
                    cmd.Parameters.AddWithValue("@monthlyId", MonthlyId);

                    var reader = cmd.ExecuteReader();
                    var layouts = new List<MonthlyLayout>();
                    while (reader.Read())
                    {
                        layouts.Add(NewMonthlyLayoutFromDb(reader));
                    }

                    reader.Close();

                    return layouts;
                }
            }
        }
        //add a new monthly layout
        public void AddMonthyLayout(MonthlyLayout monthlyLayout)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"INSERT INTO MonthlyLayout ( MonthlyId, LayoutId, InspiredBy, ImageURL, ResourceId, Style)
                                        OUTPUT INSERTED.Id
                                        VALUES (@MonthlyId, @LayoutId, @InspiredBy, @ImageURL, @ResourceId, @Style)";

                    DbUtils.AddParameter(cmd, "@MonthlyId", monthlyLayout.MonthlyId);
                    DbUtils.AddParameter(cmd, "@LayoutId", monthlyLayout.LayoutId);
                    DbUtils.AddParameter(cmd, "@InspiredBy", monthlyLayout.InspiredBy);
                    DbUtils.AddParameter(cmd, "@ImageURL", monthlyLayout.ImageURL);
                    DbUtils.AddParameter(cmd, "@ResourceId", monthlyLayout.ResourceId);
                    DbUtils.AddParameter(cmd, "@Style", monthlyLayout.Style);


                    monthlyLayout.Id = (int)cmd.ExecuteScalar();
                }
            }
        }
        //edit a monthly layout
        public void UpdateMonthlyLayout(MonthlyLayout monthlyLayout)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"UPDATE MonthlyLayout                                                                          
                                        SET MonthlyId = @monthlyId,
                                            LayoutId = @layoutId,
                                            InspiredBy = @inspiredBy,
                                            ResourceId = @resourceId,
                                            Style = @style
                                        WHERE Id = @id";

                    DbUtils.AddParameter(cmd, "@id", monthlyLayout.Id);
                    DbUtils.AddParameter(cmd, "@monthlyId", monthlyLayout.MonthlyId);
                    DbUtils.AddParameter(cmd, "@layoutId", monthlyLayout.LayoutId);
                    DbUtils.AddParameter(cmd, "@inspiredBy", monthlyLayout.InspiredBy);
                    DbUtils.AddParameter(cmd, "@imageURL", monthlyLayout.ImageURL);
                    DbUtils.AddParameter(cmd, "@resourceId", monthlyLayout.ResourceId);
                    DbUtils.AddParameter(cmd, "@style", monthlyLayout.Style);

                    cmd.ExecuteNonQuery();
                }
            }
        }

        //delete a monthly layout
        //what type of delete should this be??
        public void DeleteMonthlyLayout(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"DELETE FROM MonthlyLayout WHERE Id = @id";

                    DbUtils.AddParameter(cmd, "@id", id);
                    cmd.ExecuteNonQuery();
                }
            }
        }
        //get one monthly layout by its Id
        public MonthlyLayout GetMonthlyLayoutById(int monthlyId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @" SELECT ml.Id, ml.MonthlyId, ml.LayoutId, ml.InspiredBy, ml.ImageURL, ml.ResourceId, ml.Style, m.id [MonthlyId],
                                                up.Id [UserProfileId], up.DisplayName, up.FirstName, up.LastName, up.Email
                                         From MonthlyLayout ml
                                         LEFT JOIN Monthly m ON m.Id = ml.MonthlyId 
                                         LEFT JOIN UserProfile up ON up.id = m.UserProfileId
                                         WHERE ml.MonthlyId = @monthlyId";

                    DbUtils.AddParameter(cmd, "@Id", monthlyId);

                    var reader = cmd.ExecuteReader();
                    MonthlyLayout monthlyLayout = null;

                    if (reader.Read())
                    {
                        monthlyLayout = NewMonthlyLayoutFromDb(reader);
                    }

                    reader.Close();
                    return monthlyLayout;
                }
            }
        }
        //helper function that 
        private MonthlyLayout NewMonthlyLayoutFromDb(SqlDataReader reader)
        {
            return new MonthlyLayout()
            {                
                Id = DbUtils.GetInt(reader, "Id"),
                MonthlyId = DbUtils.GetInt(reader, "MonthlyId"),
                LayoutId = DbUtils.GetInt(reader, "LayoutId"),
                InspiredBy = DbUtils.GetNullableString(reader, "InspiredBy"),
                ImageURL = DbUtils.GetNullableString(reader, "ImageURL"),
                ResourceId = DbUtils.GetNullableInt(reader, "ResourceId"),
                Style = DbUtils.GetString(reader, "Style"),
                Monthly = new Monthly()
                {
                    Id = DbUtils.GetInt(reader, "Id"),
                    UserProfileId = DbUtils.GetInt(reader, "UserPRofileId"),
                    Month = DbUtils.GetString(reader, "Month"),
                    Year = DbUtils.GetInt(reader, "Year")
                },
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
