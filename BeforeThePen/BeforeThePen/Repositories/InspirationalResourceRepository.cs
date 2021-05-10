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
    public class InspirationalResourceRepository : BaseRepository, IInspirationalResourceRepository
    {
        public InspirationalResourceRepository(IConfiguration configuration) : base(configuration) { }

        //list all resources by user
        //left join for typeOfMedia and userProfile
        public List<Resource> GetResourcesByUserId(int userProfileId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @" SELECT r.id, r.UserProfileId, r.TypeOfMediaId, r.URL, r.Description, r.ImageURL,
                                                tm.id, tm.type,
                                                up.Id AS UserProfileId, up.DisplayName, up.FirstName, up.LastName, up.Email
                                         FROM Resource r
                                         LEFT JOIN TypeOfMedia tm ON tm.id = r.TypeOfMediaId
                                         LEFT JOIN UserProfile up ON up.id = r.UserProfileId
                                         WHERE up.Id = @userProfileId";

                    DbUtils.AddParameter(cmd, "@UserProfileId", userProfileId);

                    var reader = cmd.ExecuteReader();
                    var resources = new List<Resource>();
                    while (reader.Read())
                    {
                        resources.Add(NewResourceFromDb(reader));
                    }

                    reader.Close();

                    return resources;
                }
            }

        }

        //get one of the resources by the id
        //left join for typeOfMedia and userProfile
        public Resource GetResourcesById(int resourceId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @" SELECT r.id, r.UserProfileId, r.TypeOfMediaId, r.URL, r.Description, r.ImageURL,
                                                tm.id, tm.type,
                                                up.Id AS UserProfileId, up.DisplayName, up.FirstName, up.LastName, up.Email
                                         FROM Resource r
                                         LEFT JOIN TypeOfMedia tm ON tm.id = r.TypeOfMediaId
                                         LEFT JOIN UserProfile up ON up.id = r.UserProfileId
                                         WHERE r.id = @resourceId";

                    DbUtils.AddParameter(cmd, "@resourceId", resourceId);

                    var reader = cmd.ExecuteReader();
                    Resource resource = null;
                  if(reader.Read())
                    {
                     resource = NewResourceFromDb(reader);

                    }

                    reader.Close();

                    return resource;
                }
            }

        }
        //add a new resource
        public void AddResource(Resource resource)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"INSERT INTO Resource ( TypeOfMediaId, URL, ImageURL, Description, UserProfileId)
                                        OUTPUT INSERTED.Id
                                        VALUES (@typeOfMediaId, @url, @imageURL, @description, @userProfileId)";

                    DbUtils.AddParameter(cmd, "@typeOfMediaId", resource.TypeOfMediaId);
                    DbUtils.AddParameter(cmd, "@url", resource.URL);
                    DbUtils.AddParameter(cmd, "@imageURL", resource.ImageURL);
                    DbUtils.AddParameter(cmd, "@description", resource.Description);
                    DbUtils.AddParameter(cmd, "@userProfileId", resource.UserProfileId);



                    resource.Id = (int)cmd.ExecuteScalar();
                }
            }
        }

        //edit a resource
        public void UpdateResource(Resource resource)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"UPDATE Resource                                                                          
                                        SET TypeOfMediaId = @typeOfMediaId,
                                            URL = @url,
                                            ImageURL = @imageURL, 
                                            Description = @description
                                        WHERE Id = @id";

                    DbUtils.AddParameter(cmd, "@id", resource.Id);
                    DbUtils.AddParameter(cmd, "@typeOfMediaId", resource.TypeOfMediaId);
                    DbUtils.AddParameter(cmd, "@url", resource.URL);
                    DbUtils.AddParameter(cmd, "@imageURL", resource.ImageURL);
                    DbUtils.AddParameter(cmd, "@description", resource.Description);

                    cmd.ExecuteNonQuery();
                }
            }
        }
        //delete a resource
        //soft delete?
        public void DeleteResource(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"DELETE FROM Resource WHERE Id = @id";

                    DbUtils.AddParameter(cmd, "@id", id);
                    cmd.ExecuteNonQuery();
                }
            }
        }

        //helper function 
        private Resource NewResourceFromDb(SqlDataReader reader)
        {
            return new Resource()
            {
                Id = DbUtils.GetInt(reader, "Id"),
                UserProfileId = DbUtils.GetInt(reader, "UserProfileId"),
                TypeOfMediaId = DbUtils.GetInt(reader, "TypeOfMediaId"),
                URL = DbUtils.GetString(reader, "URL"),
                Description = DbUtils.GetNullableString(reader, "Description"),
                ImageURL = DbUtils.GetNullableString(reader, "ImageURL"),
                UserProfile = new UserProfile()
                {
                    DisplayName = DbUtils.GetString(reader, "DisplayName"),
                    FirstName = DbUtils.GetString(reader, "FirstName"),
                    LastName = DbUtils.GetString(reader, "LastName"),
                    Email = DbUtils.GetString(reader, "Email"),
                },
                TypeOfMedia = new TypeOfMedia()
                {
                    Type = DbUtils.GetString(reader, "Type")
                }
            };
        }
    }
}
