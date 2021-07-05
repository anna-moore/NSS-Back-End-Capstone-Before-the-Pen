using BeforeThePen.Models;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using static BeforeThePen.Utils.DbUtlis;

namespace BeforeThePen.Repositories
{
    public class LayoutRepository : BaseRepository, ILayoutRepository
    {
        public LayoutRepository(IConfiguration configuration) : base(configuration) { }

        //get layouts by user / customizable 
        public List<Layout> GetLayoutsByUser(int userProfileId)
        {

            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @" SELECT l.Id, l.UserProfileId, l.Type, l.TimeEstimate, l.Description,                                                
                                                up.Id AS UserProfileId, up.DisplayName, up.FirstName, up.LastName, up.Email
                                         From Layout l
                                         LEFT JOIN UserProfile up ON up.id = l.UserProfileId
                                         WHERE up.Id = @userProfileId";

                    DbUtils.AddParameter(cmd, "@userProfileId", userProfileId);

                    var reader = cmd.ExecuteReader();
                    var layouts = new List<Layout>();
                    while (reader.Read())
                    {
                        layouts.Add(NewLayoutFromDb(reader));
                    }

                    reader.Close();

                    return layouts;
                }
            }
        }

        //get layout by id this is used for edit in client side
        public Layout GetLayoutById(int layoutId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @" SELECT l.Id, l.UserProfileId, l.Type, l.TimeEstimate, l.Description,                                                                                               
                                                up.Id [UserProfileId], up.DisplayName, up.FirstName, up.LastName, up.Email
                                         From Layout l                                                                        
                                         LEFT JOIN UserProfile up ON up.id = l.UserProfileId
                                         WHERE l.Id = @layoutId";

                    DbUtils.AddParameter(cmd, "@layoutId", layoutId);

                    var reader = cmd.ExecuteReader();
                    Layout layout = null;

                    if (reader.Read())
                    {
                        layout = NewLayoutFromDb(reader);
                    }

                    reader.Close();
                    return layout;
                }
            }
        }

        //add a new layout
        public void AddLayout(Layout layout)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"INSERT INTO Layout ( UserProfileId, Type, TimeEstimate, Description)
                                        OUTPUT INSERTED.Id
                                        VALUES (@userProfileId, @type, @timeEstimate, @description)";

                    DbUtils.AddParameter(cmd, "@userProfileId", layout.UserProfileId);
                    DbUtils.AddParameter(cmd, "@type", layout.Type);
                    DbUtils.AddParameter(cmd, "@timeEstimate", layout.TimeEstimate);
                    DbUtils.AddParameter(cmd, "@description", layout.Description);


                    layout.Id = (int)cmd.ExecuteScalar();
                }
            }
        }

        //edit the layouts
        public void UpdateLayout(Layout layout)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"UPDATE Layout                                                                          
                                        SET UserProfileId = @userProfileId,                                         
                                            Type = @type,
                                            TimeEstimate = @timeEstimate,
                                            Description = @description                                            
                                        WHERE Id = @id";

                    DbUtils.AddParameter(cmd, "@id", layout.Id);
                    DbUtils.AddParameter(cmd, "@userProfileId", layout.UserProfileId);
                    DbUtils.AddParameter(cmd, "@type", layout.Type);
                    DbUtils.AddParameter(cmd, "@timeEstimate", layout.TimeEstimate);
                    DbUtils.AddParameter(cmd, "@description", layout.Description);

                    cmd.ExecuteNonQuery();
                }
            }
        }

        //delete the layout
        public void DeleteLayout(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"DELETE FROM Layout WHERE Id = @id";

                    DbUtils.AddParameter(cmd, "@id", id);
                    cmd.ExecuteNonQuery();
                }
            }
        }

        //helper function  
        private Layout NewLayoutFromDb(SqlDataReader reader)
        {
            return new Layout()
            {
                Id = DbUtils.GetInt(reader, "Id"),
                UserProfileId = DbUtils.GetInt(reader, "UserPRofileId"),
                Type = DbUtils.GetString(reader, "Type"),
                TimeEstimate = DbUtils.GetNullableInt(reader, "TimeEstimate"),
                Description = DbUtils.GetNullableString(reader, "Description"),
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
